/**
 * Personal and professional projects
 */
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "Homelab Infrastructure",
    description: "A Kubernetes-based homelab infrastructure for learning and experimentation.",
    technologies: ["Ansible", "Terraform", "GH Actions"],
    github: "https://github.com/msdeleyto/homelab-infra",
  },
  {
    title: "Homelab Services",
    description: "ArgoCD setup for managing homelab services.",
    technologies: ["Kubernetes", "ArgoCD", "Observability", "HashiCorp Vault", "GH Actions"],
    github: "https://github.com/msdeleyto/homelab-manifests",
  },
  {
    title: "Profile Website",
    description: "This personal profile website showcasing my experience and projects.",
    technologies: ["Astro", "TypeScript", "Tailwind CSS", "GH Actions"],
    github: "https://github.com/msdeleyto/profile-website",
  }
];
