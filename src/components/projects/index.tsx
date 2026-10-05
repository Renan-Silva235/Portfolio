import { useState } from "react";
import { Box, Typography, Paper, Stack, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as color from "../../config/colors";
import type { Project } from "../../types";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { ProjectLinks } from "./parts";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Box sx={{ py: 10, px: 2, backgroundColor: "transparent" }}>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            mb: 6,
            textAlign: "center",
            background: color.linearGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Projetos em Destaque
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {projects.map((proj) => (
            <Paper
              key={proj.id}
              elevation={0}
              sx={{
                p: 3,
                width: {
                  xs: "100%",
                  sm: "calc(50% - 32px)",
                  md: "calc(33.3% - 32px)",
                },
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                borderRadius: "24px",
                border: "1px solid rgba(84, 104, 255, 0.2)",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                transition: "0.4s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  borderColor: "#4FD1C5",
                },
              }}
            >
              <Stack spacing={2} sx={{ height: "100%" }}>
                <Typography
                  variant="h5"
                  // Reserva 2 linhas para "Ver detalhes" ficar alinhado entre os cards
                  sx={{ color: "#fff", fontWeight: 800, minHeight: "2.67em" }}
                >
                  {proj.title}
                </Typography>

                {/* flexGrow mantém os botões alinhados no rodapé de todos os cards */}
                <Box sx={{ flexGrow: 1 }}>
                  <Button
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => setSelected(proj)}
                    sx={{
                      color: "#a0a0a0",
                      textTransform: "none",
                      px: 0,
                      "&:hover": {
                        color: "#4FD1C5",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    Ver detalhes
                  </Button>
                </Box>

                <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                  <ProjectLinks project={proj} />
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>

      <ProjectDetailsModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
}
