import { Box } from '@repo/ui';

interface JobPostingDescriptionProps {
  description: string;
}

export const JobPostingDescription = ({
  description,
}: JobPostingDescriptionProps) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: description }}
      sx={{ lineHeight: 'lg', fontSize: 'lg', wordBreak: 'break-all' }}
    />
  );
};
