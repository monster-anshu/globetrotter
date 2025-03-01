import Button from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { UserRoundPlus } from 'lucide-react';
import React, { FC } from 'react';
import ReactConfetti from 'react-confetti';
import { TbPlayerTrackNext } from 'react-icons/tb';

type ISuccessDialogProps = {
  funFact: string;
  handleNext: () => void;
  answer: string;
  setInviting: (value: boolean) => void;
  inviting: boolean;
  isPending: boolean;
};

const SuccessDialog: FC<ISuccessDialogProps> = ({
  funFact,
  handleNext,
  answer,
  setInviting,
  isPending,
  inviting,
}) => {
  return (
    <Dialog open modal={false}>
      <DialogContent>
        <DialogTitle className="sr-only">
          Congratulations , correct answer
        </DialogTitle>
        <div>
          <p className="text-2xl">Congratulations 🎉</p>
          <p className="text-primary bg-primary/10 my-4 mb-2 px-4 py-2 text-center text-lg sm:text-2xl">
            {answer}
          </p>
          <p className="text-lg">Fun fact</p>
          <p className="font-light">{funFact}</p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => setInviting(true)}
            aria-label="Challenge friend"
            className="flex justify-center gap-2"
          >
            <UserRoundPlus />
            <span>Challenge friend</span>
          </Button>
          <Button variant="secondary" onClick={handleNext} loading={isPending}>
            <div className="flex items-center justify-center gap-2">
              <span>Next</span>
              <TbPlayerTrackNext />
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
      {!inviting && (
        <ReactConfetti
          style={{
            zIndex: 100,
          }}
        />
      )}
    </Dialog>
  );
};

export default SuccessDialog;
