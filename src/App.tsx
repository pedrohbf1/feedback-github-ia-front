import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { marked } from "marked";
import { postFeedbackByUsernameGithub } from "./service/feedback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GitHubFeedback() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { mutate } = useMutation({
    mutationFn: (username: string) => postFeedbackByUsernameGithub(username),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setFeedback(data.feedback);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim() !== "") {
      mutate(username);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-xl shadow-lg border-0 overflow-x-auto ">
        <CardHeader className="bg-white border-b border-slate-100 ">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5 text-slate-700" />
            <CardTitle className="text-xl font-medium text-slate-800">
              GitHub Feedback
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500">
            Obtenha feedback baseado em seu perfil do GitHub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nome de usuário do GitHub"
                  className="pr-10 h-12 bg-slate-50 border-slate-200 focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50 transition-all"
                />
                <Github className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 px-1">
                Digite o nome de usuário para analisar o perfil
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || username.trim() === ""}
              className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analisando perfil...
                </span>
              ) : (
                "Obter Feedback"
              )}
            </Button>
          </form>

          <AnimatePresence>
            {loading ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-slate-200 border-solid rounded-full animate-pulse" />
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-slate-800 border-solid rounded-full animate-spin" />
                </div>
                <p className="text-sm text-slate-500 animate-pulse">
                  Analisando repositórios e atividades...
                </p>
              </motion.div>
            ) : (
              !loading &&
              feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 opacity-20 pointer-events-none" />
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 rounded-full" />
                    <div
                      className="pl-6 gap-6 flex flex-col prose prose-slate max-w-none 
                        prose-headings:font-medium prose-headings:text-slate-800 
                        prose-p:text-slate-600 prose-strong:text-slate-700 
                        prose-a:text-slate-800 prose-a:no-underline prose-a:font-medium 
                        hover:prose-a:underline prose-li:text-slate-600 
                        prose-p:leading-relaxed prose-li:leading-relaxed 
                        [ul>li]:mb-2 feedback-div-custom
                      "
                      dangerouslySetInnerHTML={{ __html: marked(feedback) }}
                    />
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
