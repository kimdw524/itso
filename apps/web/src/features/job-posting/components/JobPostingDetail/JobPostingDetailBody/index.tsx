import { Box } from '@kimdw-rtk/ui';

interface JobPostingDetailBodyProps {
  children: string;
}

export const JobPostingDetailBody = ({
  children,
}: JobPostingDetailBodyProps) => {
  return (
    <>
      <Box
        dangerouslySetInnerHTML={{ __html: children }}
        sx={{
          lineHeight: 'lg',
          fontSize: 'lg',
        }}
      />
      {/* JobPostingHeaderSimple 때문에 추가한 padding */}
      <div style={{ height: '6rem' }} />
    </>
  );
};
