import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { queryClient } from '@/provider/react-query';
import { userInfoQuery } from '@/queries/user.query';
import { UserService } from '@/services/user.service';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { toast } from 'sonner';
import ChallengeFried from './ChallengeFriend';
import Button from './ui/button';
import Spinner from './ui/spinner';

type IChallengeDialogProps = {
  onClose: () => void;
};

const ChallengeDialog: FC<IChallengeDialogProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const { data, isLoading } = useQuery(userInfoQuery);

  const saveMutation = useMutation({
    mutationFn: UserService.create,
    onSuccess(data) {
      queryClient.setQueryData(userInfoQuery.queryKey, data);
    },
  });

  const handleSave = () => {
    if (!username.trim()) {
      toast.error('Please fill your username');
      return;
    }
    saveMutation.mutate({ username: username });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={data ? 'w-max !max-w-max' : ''}>
        <DialogTitle className="sr-only">Share challange</DialogTitle>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data && (
              <ChallengeFried
                score={data.score}
                username={data.username}
                userId={data.userId}
              />
            )}
            {data === null && (
              <div>
                <label htmlFor="name">Username</label>
                <input
                  className="mt-2 mb-4 w-full rounded border px-2 py-2"
                  placeholder="Enter your username"
                  id="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <DialogFooter>
                  <Button onClick={handleSave} loading={saveMutation.isPending}>
                    Save
                  </Button>
                </DialogFooter>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeDialog;
