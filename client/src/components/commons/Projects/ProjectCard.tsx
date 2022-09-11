import { Loader } from "@react-three/drei";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import { UserContext } from "../../../contexts/UserContext";
import { IProject } from "../../../Interface";
import Camera from "../Models/Camera";
import ModelLight from "../Models/ModelLight";
import RoomContent from "../ShowRoom/RoomContent";
import RoomStage from "../ShowRoom/RoomStage";

interface Props {
  setrefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  project: IProject;
  setshowProjectForm?: React.Dispatch<React.SetStateAction<boolean>>;
  setcurrentProject?: React.Dispatch<React.SetStateAction<IProject>>;
}

function ProjectCard(props: Props) {
  let navigate = useNavigate();
  const favoredRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useContext(UserContext);
  const { setrefresh, type, project, setshowProjectForm, setcurrentProject } =
    props;
  const [onMarket, setonMarket] = useState<boolean>(project.on_market);
  const [favored, setfavored] = useState<boolean>(false);
  const [cardProject, setcardProject] = useState<IProject>({
    id: 0,
    title: "",
    on_market: false,
    model_groups: [{ id: 0, group_name: "" }],
  });

  const showProject = cardProject.model_groups.map((group) => (
    <RoomContent key={group.id} group={group} />
  ));

  useEffect(() => {
    fetch(`/projects_data/${project.id}`).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((data) => {
            setcardProject(data);
            setfavored(data.favored);
          })
          .catch(console.error);
      } else {
        res.json().then(console.log);
      }
    });
  }, []);

  // to update favered icon status
  useEffect(() => {
    if (favoredRef.current) {
      const target = favoredRef.current;
      if (favored) {
        target.classList.add("liked");
      } else if (target.classList.contains("liked")) {
        target.classList.remove("liked");
      }
    }
  }, [favored]);

  function toProjectDesign(id?: number) {
    navigate(`/project-design/${id}`);
  }

  function putOnMarket(e: React.ChangeEvent<HTMLInputElement>) {
    fetch(`/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ on_market: e.target.checked }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => setonMarket(data.on_market));
      } else {
        res.json().then((data) => alert(data.error));
      }
    });
  }

  function deleteProject() {
    if (window.confirm("Are you sure?")) {
      fetch(`/projects/${project.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              alert(data.message);
              if (setrefresh) {
                setrefresh((state: boolean) => !state);
              }
            });
          } else {
            res.json().then((data) => alert(data.error));
          }
        })
        .catch(console.error);
    }
  }

  function toggleLike(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    fetch(`/user_projects_set_favor/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favored: !favored }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setfavored(data.favored);
          if (setrefresh) {
            setrefresh((state: boolean) => !state);
          }
        });
      } else {
        res.json().then((data) => alert(data.error));
      }
    });
  }

  return (
    <div
      className={`col-span-1 flex flex-col items-center min-h-360 max-h-1/2screen border border-blue-200 rounded-xl  ${
        currentUser.id === project.created_by ? "bg-green-800" : "bg-slate-900"
      }`}
    >
      <div className="h-4/5 min-h-100 w-full rounded-t-xl bg-blue-100">
        <NavLink to={`/project-detail-view/${project.id}`}>
          <Canvas
            camera={{
              position: [
                cardProject.project_setting?.xcamera || 5,
                cardProject.project_setting?.ycamera || 5,
                cardProject.project_setting?.zcamera || 5,
              ],
              near: 0.1,
              far: 1000,
            }}
          >
            <Camera setting={cardProject.project_setting} />
            <ModelLight />
            <Suspense fallback={null}>
              <RoomStage>{showProject}</RoomStage>
            </Suspense>
          </Canvas>
          <Loader />
        </NavLink>
      </div>
      <div className="w-full px-3 pb-2 text-white">
        <div className="py-2">
          <div className="flex justify-between">
            <h1 className="text-3xl">{project.title}</h1>

            {/* like button */}
            {currentUser.id !== project.created_by && (
              <div
                ref={favoredRef}
                className="heart-like-button"
                onClick={(e) => toggleLike(e)}
              ></div>
            )}
          </div>
          {type !== "myProject" && <h1>Creator: {project.creator}</h1>}
        </div>
        {type === "myProject" && (
          <div className="flex items-center justify-between min-h-card-b">
            <div>
              <div>
                <button
                  className="project-card-btn hover:bg-blue-300"
                  onClick={() => {
                    if (setshowProjectForm && setcurrentProject) {
                      setshowProjectForm(true);
                      setcurrentProject(project);
                    }
                  }}
                  disabled={onMarket}
                >
                  Edit
                </button>
                <button
                  className="project-card-btn hover:bg-green-600"
                  onClick={() => toProjectDesign(project.id)}
                  disabled={onMarket}
                >
                  Build
                </button>
                <button
                  className="project-card-btn hover:bg-red-600"
                  onClick={deleteProject}
                  disabled={onMarket}
                >
                  Delete
                </button>
              </div>
              {onMarket && (
                <div className="text-xs ml-2">
                  Take project off market before edit
                </div>
              )}
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    className="sr-only"
                    type="checkbox"
                    checked={onMarket}
                    onChange={(e) => {
                      putOnMarket(e);
                    }}
                  />
                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                </div>
                <div className="ml-3 text-white font-medium">On Market</div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
