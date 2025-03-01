'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { FC } from 'react';
import { toast } from 'sonner';

export interface IReactQueryProviderProps {
  children: React.ReactNode;
}

const errorRecord: Record<string, string> = {
  USERNAME_ALREADY_USED: 'username already in use',
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
    mutations: {
      onError(error) {
        let message = error.message || 'Something went wrong';
        message = errorRecord[message] ?? message;
        toast.error(message);
      },
    },
  },
});

const ReactQueryProvider: FC<IReactQueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
