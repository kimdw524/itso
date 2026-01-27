import { Box } from '@kimdw-rtk/ui';

interface JobPostingDescriptionProps {
  description: string;
}

export const JobPostingDescription = ({
  description,
}: JobPostingDescriptionProps) => {
  return (
    <>
      <Box
        dangerouslySetInnerHTML={{ __html: description }}
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
