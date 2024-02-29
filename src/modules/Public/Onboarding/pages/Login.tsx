import { Envelope, Lock, User } from "phosphor-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userSignInValidation } from "../validations";
import { TextInput } from "../../../../core/components/molecules";
import { ButtonElement } from "../../../../core/components/atoms";
import { useAuth } from "../../../../core/context/AuthContext";
import { AuthModel } from "../../../../models/Auth.model";

export const Login = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AuthModel>({
    resolver: yupResolver(userSignInValidation),
    defaultValues: {},
  });

  const { login } = useAuth();
  const handleSubmitUser = async (data: AuthModel) => {
    const dataSave = {
      username: data.username,
      password: data.password,
    };

    await login(dataSave);
  };

  return (
    <form
      action=""
      className="flex flex-col items-stretch w-80 gap-4"
      onSubmit={handleSubmit(handleSubmitUser)}
    >
      <TextInput
        className="w-full placeholder:text-gray-900 text-gray-900"
        type="text"
        id="username"
        name="username"
        label="Nome"
        placeholder="Digite o seu Nome"
        icon={<Envelope />}
        register={register("username")}
        helperText={errors.username?.message}
      />
      <TextInput
        className="w-full placeholder:text-gray-900 text-gray-900"
        type="password"
        id="password"
        name="password"
        label="Senha"
        placeholder="Digite sua Senha"
        icon={<Lock />}
        register={register("password")}
        helperText={errors.password?.message}
      />
      {/* <label htmlFor="remember" className='flex items-center gap-2'>
          <CheckboxElement id='remember' />
          <TextElement className='text-gray-200 cursor-pointer' size='sm'>Lembrar de mim por 30 dias</TextElement>
        </label> */}
      <ButtonElement variant="primary" type="submit">
        Entrar na Plataforma
      </ButtonElement>
    </form>
  );
};
