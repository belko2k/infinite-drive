import { CheckCircle } from 'lucide-react';

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
