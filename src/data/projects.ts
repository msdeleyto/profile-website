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
    title: "k8s homelab",
    description: "Personal Kubernetes homelab setup with self-hosted services and monitoring.",
    technologies: ["ArgoCD", "Kubernetes", "Grafana", "Prometheus", "Helm", "GH Actions"],
    github: "https://github.com/home-kops/k8s-homelab",
  },
  {
    title: "Profile Website",
    description: "This personal profile website showcasing my experience and projects.",
    technologies: ["Astro", "TypeScript", "Tailwind CSS", "GH Actions"],
    link: "https://msdeleyto.es",
    github: "https://github.com/ironwithout/profile",
  },
  {
    title: "AWS Profile IaC",
    description: "Infrastructure as Code for deploying my personal profile website on AWS using Terraform and GitHub Actions.",
    technologies: ["Terraform", "GitHub Actions", "AWS"],
    github: "https://github.com/ironwithout/aws-iac",
  }
];
