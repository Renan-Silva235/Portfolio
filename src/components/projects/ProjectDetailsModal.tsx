import type { ReactNode } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LinkIcon from "@mui/icons-material/Link";
import * as color from "../../config/colors";
import type { Project } from "../../types";
import { ProjectLinks, ProjectTags } from "./parts";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

// Bloco com rótulo + ícone, para o visitante saber o que é cada informação
function Section({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1.5,
          color: "#4FD1C5",
          "& svg": { fontSize: 18 },
        }}
      >
        {icon}
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

export default function ProjectDetailsModal({
  project,
  onClose,
}: ProjectDetailsModalProps) {
  const hasLinks = Boolean(project?.github_url || project?.demo_url);

  return (
    <Dialog
      open={project !== null}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="body"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#0f1320",
            backgroundImage: "none",
            borderRadius: "24px",
            border: "1px solid rgba(84, 104, 255, 0.3)",
            color: "#fff",
            overflow: "hidden",
          },
        },
        backdrop: { sx: { backdropFilter: "blur(4px)" } },
      }}
    >
      {project && (
        <>
          {/* Faixa em gradiente no topo, no mesmo estilo do resto do site */}
          <Box sx={{ height: 4, background: color.linearGradient }} />

          {project.image_url && (
            <Box
              component="img"
              src={project.image_url}
              alt={project.title}
              sx={{
                display: "block",
                width: "100%",
                maxHeight: 320,
                objectFit: "cover",
              }}
            />
          )}

          <DialogContent sx={{ p: { xs: 3, md: 4 }, position: "relative" }}>
            <IconButton
              onClick={onClose}
              aria-label="Fechar"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "#a0a0a0",
                "&:hover": { color: "#fff" },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              variant="overline"
              sx={{ color: "#a0a0a0", letterSpacing: 3 }}
            >
              Projeto
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                pr: 5,
                background: color.linearGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {project.title}
            </Typography>

            <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.08)" }} />

            <Stack spacing={4}>
              {project.tags.length > 0 && (
                <Section icon={<CodeIcon />} label="Tecnologias">
                  <ProjectTags tags={project.tags} />
                </Section>
              )}

              {project.description && (
                <Section
                  icon={<DescriptionOutlinedIcon />}
                  label="Sobre o projeto"
                >
                  {/* pre-line mantém os parágrafos digitados no painel */}
                  <Typography
                    sx={{
                      color: "#d0d0d0",
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {project.description}
                  </Typography>
                </Section>
              )}

              {hasLinks && (
                <Section icon={<LinkIcon />} label="Links">
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <ProjectLinks project={project} />
                  </Stack>
                </Section>
              )}
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
