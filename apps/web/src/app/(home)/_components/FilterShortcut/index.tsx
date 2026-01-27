import { Box, ScrollArea } from '@kimdw-rtk/ui';

import { FilterShortcutItem } from '../FilterShortcutItem';

export const FilterShortcut = () => {
  return (
    <ScrollArea>
      <Box flex flexWrap="wrap" gap="lg">
        <FilterShortcutItem
          name="신입 프론트엔드 개발자"
          jobIds={[1]}
          minExperience={0}
          maxExperience={0}
        />
        <FilterShortcutItem
          name="신입 백엔드 개발자"
          jobIds={[2]}
          minExperience={0}
          maxExperience={0}
        />
        <FilterShortcutItem
          name="신입 웹 개발자"
          jobIds={[1, 2, 3]}
          minExperience={0}
          maxExperience={0}
        />
        <FilterShortcutItem
          name="주니어 프론트엔드 개발자"
          jobIds={[1]}
          minExperience={0}
          maxExperience={3}
        />
        <FilterShortcutItem
          name="주니어 백엔드 개발자"
          jobIds={[2]}
          minExperience={0}
          maxExperience={3}
        />
      </Box>
    </ScrollArea>
  );
};
