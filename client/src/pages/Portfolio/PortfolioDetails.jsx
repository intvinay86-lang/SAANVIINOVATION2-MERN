import { useParams, Navigate } from "react-router-dom";
import ProjectDetailsCard from "./Components/ProjectDetailsCard";
import { portfolioDetailsData } from "./Components/portfolioDetailsData";

function PortfolioDetails() {
  const { id } = useParams();

  const project = portfolioDetailsData.find((p) => p.id === parseInt(id));

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <>
      <title>{project.title} - Portfolio | SAANVI INNOVATION</title>
      <meta
        name="description"
        content={project.fullDescription.substring(0, 160)}
      />
      <meta
        name="keywords"
        content={`${project.title}, ${project.category}, ${project.technologies.join(", ")}`}
      />
      <meta
        property="og:title"
        content={`${project.title} - SAANVI INNOVATION`}
      />
      <meta property="og:description" content={project.description} />
      <meta property="og:image" content={project.image} />
      <link
        rel="canonical"
        href={`https://saanviinnovation.com/portfolio/${id}`}
      />

      <ProjectDetailsCard project={project} />
    </>
  );
}

export default PortfolioDetails;
