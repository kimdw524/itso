import { JOB_POSTING } from '../../constants/job-posting';
import type { JobPosting } from '../../types/job-posting';
import { formatEmploymentType, formatExperienceRange } from '../../utils';
import { InfoItem } from './InfoItem';

interface JobDetailProps {
  jobPosting: JobPosting;
}

export const JobDetail = ({ jobPosting }: JobDetailProps) => {
  return (
    <>
      <InfoItem
        name="경력사항"
        value={formatExperienceRange(
          jobPosting.minExperience,
          jobPosting.maxExperience,
        )}
      />
      <InfoItem
        name="고용형태"
        value={formatEmploymentType(jobPosting.employmentType)}
      />
      <InfoItem
        name="직군 / 직무"
        value={JOB_POSTING.JOB_NAME[jobPosting.jobId]}
      />
      <InfoItem
        name="시작일"
        value={new Date(jobPosting.openDate).toLocaleString()}
      />
      <InfoItem
        name="마감일"
        value={
          jobPosting.dueDate === null
            ? '상시채용'
            : new Date(jobPosting.dueDate).toLocaleString()
        }
      />
    </>
  );
};
