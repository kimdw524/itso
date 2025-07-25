import { Button } from '@repo/ui';

interface ShowAllButtonProps {
  isShowAll: boolean;
  onClick: () => void;
}

export const ShowAllButton = ({ isShowAll, onClick }: ShowAllButtonProps) => {
  return (
    <>
      <Button color={isShowAll ? 'primary' : 'secondary'} onClick={onClick}>
        모든 공고 보기
      </Button>
    </>
  );
};
