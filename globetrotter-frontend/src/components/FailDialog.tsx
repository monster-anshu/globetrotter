import animation from '@/assets/animations/sad.json';
import Button from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import Lottie from 'lottie-react';
import React, { FC } from 'react';
import { TbPlayerTrackNext } from 'react-icons/tb';

type IFailDialogProps = {
  funFact: string;
  handleNext: () => void;
  answer: string;
};

const FailDialog: FC<IFailDialogProps> = ({ funFact, handleNext, answer }) => {
  return (
    <Dialog open modal={false}>
      <DialogContent>
        <DialogTitle className="sr-only">incorrect answer</DialogTitle>
        <div>
          <Lottie
            animationData={animation}
            loop={true}
            autoplay={true}
            className="mx-auto"
            style={{ width: 150, height: 150 }}
          />
          <p className="mb-1 text-center text-2xl">
            Your answer is not correct
          </p>
          <p className="text-primary bg-primary/10 mb-2 px-4 py-2 text-center text-2xl">
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
    </Dialog>
  );
};

export default FailDialog;
