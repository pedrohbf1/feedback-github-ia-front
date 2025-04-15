

const localStorageData = {} as { [key: string]: string };

export const localStorage =
  "localStorage" in globalThis
    ? globalThis.localStorage
    : {
      getItem: (key: string) => {
        return localStorageData[key];
      },
      setItem: (key: string, value: string) => {
        localStorageData[key] = value;
        return;
      },
      removeItem: (key: string) => {
        delete localStorageData[key];
        return;
      },
    };

class ApiService {
  private readonly baseURL: string;

  constructor(baseURL: string = import.meta.env.VITE_API_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const tokenStorage = await localStorage.getItem("jwt");
    const token = tokenStorage ? `Bearer ${tokenStorage}` : "";

    const headers = new Headers(options.headers);
    headers.set("Authorization", token);

    const response = await fetch(this.baseURL + url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      localStorage.removeItem("jwt");
      throw new Error(`${await response.text()}`);
    }

    const data = await response.json();
    return data as T;
  }

  public setTokens(token: string) {
    if (token) {
      localStorage.setItem("jwt", token);
    }
  }


  public async get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: "GET",
    });
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
    });
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
    });
  }

  public async delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: "DELETE",
    });
  }

  public async postFile<T>(
    url: string,
    files: FileList | File[],
    data?: Record<string, unknown>,
    config?: RequestInit
  ): Promise<T> {
    const formData = new FormData();
    for (const file of files as FileList) {
      formData.append("file", file);
    }
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, String(data[key]));
      });
    }
    return this.request<T>(url, {
      method: "POST",
      body: formData,

      headers: {
        ...config?.headers,
      },
    });
  }

  public async postForm<T>(
    url: string,
    data?: Record<string, unknown>, // Espera que os dados sejam um objeto
    config?: RequestInit
  ): Promise<T> {
    // Converte o objeto de dados para uma string codificada em x-www-form-urlencoded
    const urlEncodedData = new URLSearchParams();
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          // Converte objetos complexos para strings JSON, caso necessário
          urlEncodedData.append(key, JSON.stringify(value));
        } else {
          urlEncodedData.append(key, String(value));
        }
      });
    }

    return this.request<T>(url, {
      ...config,
      method: "POST",
      body: urlEncodedData.toString(), // Converte para string
      headers: {
        ...config?.headers,
        "sec-fetch-site": "same-site",
        accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });
  }
}

export { ApiService };
