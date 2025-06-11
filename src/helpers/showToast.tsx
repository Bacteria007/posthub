import { toast } from 'sonner';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
} from 'lucide-react';

type ToastParams = {
  title: string;
  description?: string;
  duration?: number;
};

export const showToast = {
  success: ({ title, description, duration = 4000 }: ToastParams) =>
    toast.success(title, {
      description: (
        <span className="text-sm text-neutral-600 dark:text-foreground">
          {description}
        </span>
      ),
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      duration,
    }),

  error: ({ title, description, duration = 5000 }: ToastParams) =>
    toast.error(title, {
      description: (
        <span className="text-sm text-neutral-600 dark:text-foreground">
          {description}
        </span>
      ),
      icon: <XCircle className="h-4 w-4 text-red-600" />,
      duration,
    }),

  info: ({ title, description, duration = 4000 }: ToastParams) =>
    toast.info(title, {
      description: (
        <span className="text-sm text-neutral-600 dark:text-foreground">
          {description}
        </span>
      ),
      icon: <Info className="h-4 w-4 text-blue-600" />,
      duration,
    }),

  warning: ({ title, description, duration = 4500 }: ToastParams) =>
    toast.warning(title, {
      description: (
        <span className="text-sm text-neutral-600 dark:text-foreground">
          {description}
        </span>
      ),
      icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
      duration,
    }),

  loading: ({ title, description }: Omit<ToastParams, 'duration'>) =>
    toast.loading(title, {
      description: (
        <span className="text-sm text-neutral-600 dark:text-foreground">
          {description}
        </span>
      ),
      icon: <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />,
      duration: Infinity,
    }),

  promise: (
    promise: Promise<ToastParams>,
    {
      loading = 'Loading...',
      success = 'Success!',
      error = 'Something went wrong!',
    }: {
      loading?: string;
      success?: string;
      error?: string;
    }
  ) =>
    toast.promise(promise, {
      loading,
      success,
      error,
    }),
};