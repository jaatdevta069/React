import InputFields from "./inputFields";
import { useForm } from "react-hook-form";
import { formRegister } from "./formregister";
import { memo } from "react";

function LoginBlock({
  setpathname,
  log,
  visibility,
  changeVisibility
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  setpathname(window.location.pathname);
  
  console.log('login page');
  const submitdata = (data,event) => {
    log(event,data.userName,data.password);
  };

  return (
    <div className="loginBlock">
      <form className="loginform" onSubmit={handleSubmit(submitdata)}>
        <InputFields
          label={"Username"}
          placeholder={"Username"}
          type={"text"}
          name={"userName"}
          htmlFor={"userName"}
          register={{
            ...register(
              "userName",
              formRegister('username dalo vro',new RegExp('^[a-z0-9]+$'),'sahi likh')
            ),
          }}
          showAlert={errors?.userName}
          messgae={errors?.userName?.message}
        />
        <InputFields
          label={"Password"}
          placeholder={"Password"}
          type={visibility ? "text" : "password"}
          name={"password"}
          register={{
            ...register(
              "password",
              formRegister('password dalo vro')
            ),
          }}
          showAlert={errors?.password}
          messgae={errors?.password?.message}
          htmlFor={"password"}
          child={
            <div className="visibility" onClick={changeVisibility}>
              👁️
            </div>
          }
        />
        <input className="hide" type="submit" />
      </form>
      <div className="flexColumn loginbut">
        <button
          className="loginButton"
          type="submit"
          disabled={false}
        >
          Login
        </button>
        <span className="registerlink">
          New user?{" "}
            <a href="/auth/register">click here to register</a>
        </span>
      </div>
    </div>
  );
}

export default memo(LoginBlock);
