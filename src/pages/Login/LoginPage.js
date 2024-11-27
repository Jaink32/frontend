import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import classes from "./loginPage.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            label="email"
            name="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: "Please enter a valid email address",
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true,
            })}
            error={errors.password}
          />

          <Button type="submit" text="Login" />

          <div className={classes.register}>
            New user? &nbsp;
            <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
