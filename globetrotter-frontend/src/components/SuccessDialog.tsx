import Button from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import React, { FC } from 'react';
import ReactConfetti from 'react-confetti';
import { TbPlayerTrackNext } from 'react-icons/tb';

type ISuccessDialogProps = {
  funFact: string;
  handleNext: () => void;
  answer: string;
};

const SuccessDialog: FC<ISuccessDialogProps> = ({
  funFact,
  handleNext,
  answer,
}) => {
  return (
    <Dialog open modal={false}>
      <DialogContent>
        <DialogTitle className="sr-only">
          Congratulations , correct answer
        </DialogTitle>
        <div>
          <p className="text-2xl">Congratulations 🎉</p>
          <p className="text-primary bg-primary/10 my-2 mb-2 px-4 py-2 text-center text-2xl">
            {answer}
          </p>
          <p className="text-lg">Fun fact</p>
          <p className="font-light">{funFact}</p>
        </div>
        <DialogFooter>
          <Button
            className="ml-auto flex items-center gap-2"
            variant="secondary"
            onClick={handleNext}
          >
            <span>Next</span>
            <TbPlayerTrackNext />
          </Button>
        </DialogFooter>
      </DialogContent>
      <ReactConfetti className="z-[100]" />
    </Dialog>
  );
};

export default SuccessDialog;
