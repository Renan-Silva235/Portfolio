import { Box, Button, Typography } from "@mui/material";
import * as color from "../../config/colors";
import type { Project } from "../../types";

// Pílulas de tecnologias, usadas no card e no modal de detalhes
export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {tags.map((tag) => (
        <Typography
          key={tag}
          sx={{
            fontSize: "0.75rem",
            color: "#4FD1C5",
            backgroundColor: "rgba(79, 209, 197, 0.1)",
            px: 1.5,
            py: 0.5,
            borderRadius: "50px",
            fontWeight: "bold",
          }}
        >
          {tag}
        </Typography>
      ))}
    </Box>
  );
}

// Botões GitHub / Demonstração (só aparecem se o link estiver preenchido)
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.github_url && (
        <Button
          fullWidth
          variant="outlined"
          href={project.github_url}
          target="_blank"
          sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}
        >
          GitHub
        </Button>
      )}
      {project.demo_url && (
        <Button
          fullWidth
          variant="contained"
          href={project.demo_url}
          target="_blank"
          sx={{ background: color.linearGradient }}
        >
          Demonstração
        </Button>
      )}
    </>
  );
}
