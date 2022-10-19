import useUserData from "../hooks/useUserData";

type ProtectedProps = {
  children: React.ReactNode;
  permissions: string | string[];
  errorMessage?: string;
};

export default function Protected(props: ProtectedProps) {
  const { authorize } = useUserData();

  return authorize(props.permissions) ? (
    <>{props.children}</>
  ) : (
    <span>{props.errorMessage || null}</span>
  );
}
