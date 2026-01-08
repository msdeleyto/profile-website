/**
 * Professional experience data
 */
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  status: 'current' | 'completed';
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: "XING",
    role: "Senior DevOps Engineer",
    period: "2023 → Present",
    location: "Remote",
    status: "current",
    description: "Senior DevOps Engineer in a cross-functional platform team, designing and operating cloud-native infrastructure and CI/CD systems for large-scale applications, with a focus on automation, reliability, and cost efficiency.",
    achievements: [
      "Reduced total CI build minutes by 36% year on year",
      "Test feedback time by 33%",
      "55% CI cost reduction for unit tests",
      "37% CI cost reduction for static code analysis",
      "Smart mobile apps release automation through git history analysis",
    ],
    technologies: ["Docker", "k8s", "helm", "ArgoCD", "GH Actions", "Jenkins", "MySQL", "AWS", "Ruby", "Bash", "Git"],
  },
  {
    company: "XING",
    role: "Senior Android Engineer",
    period: "2020 → 2023",
    location: "Hybrid",
    status: "completed",
    description: "Product feature development and platform improvements for XING's Android app, a professional networking platform.",
    achievements: [
      "Solid collaboration with backend, iOS, and frontend teams to deliver valuable product features",
      "Increased test coverage significantly to improve product quality through relevant tests",
      "Mentored new team members on product and platform functionalities",
    ],
    technologies: ["Java/Kotlin", "Gradle", "KMP", "Room", "GraphQL", "Bash", "Ruby", "Git"],
  },
  {
    company: "SmallWorld",
    role: "Android Developer",
    period: "2018 → 2020",
    location: "On-site",
    status: "completed",
    description: "Led Android development for a financial app, focusing on performance optimization and feature implementation.",
    achievements: [
      "Migration of Java to Kotlin for Android application",
      "Crash rate reduction by ~30%",
      "Security improvements",
    ],
    technologies: ["Java/Kotlin", "Retrofit", "MySQLite", "Git"],
  },
  {
    company: "Redsys",
    role: "SmartCard Engineer",
    period: "2017 → 2018",
    location: "On-site",
    status: "completed",
    description: "First steps as a software engineer, developing features and maintaining a Java-based payment application for smart cards.",
    achievements: [
      "Analysis and optimization of existing codebase",
      "Implementation of CPACE",
    ],
    technologies: ["JavaCard", "C", "Assembly"],
  },
];
