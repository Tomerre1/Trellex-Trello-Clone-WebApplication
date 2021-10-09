import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export function HomeProfile(props) {
  return (
    <div className="home-profile main-layout">
      <div className="profile-details">
        <img className="profile-img" src={props.imgUrl} />
        <h2>{props.name}</h2>
        <div className="links">
          <a href={props.ghUrl} target="blank">
            <GitHubIcon />
          </a>
          <a href={props.liUrl} target="blank">
          <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
