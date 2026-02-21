import { Box, ScrollArea } from '@kimdw-rtk/ui';

import { FilterShortcutItem } from '../FilterShortcutItem';

export const FilterShortcut = () => {
  return (
    <ScrollArea>
      <Box flexWrap="wrap" gap="lg" flex>
        <FilterShortcutItem
          jobIds={[1]}
          maxExperience={0}
          minExperience={0}
          name="신입 프론트엔드 개발자"
        />
        <FilterShortcutItem
          jobIds={[2]}
          maxExperience={0}
          minExperience={0}
          name="신입 백엔드 개발자"
        />
        <FilterShortcutItem
          jobIds={[1, 2, 3]}
          maxExperience={0}
          minExperience={0}
          name="신입 웹 개발자"
        />
        <FilterShortcutItem
          jobIds={[1]}
          maxExperience={3}
          minExperience={0}
          name="주니어 프론트엔드 개발자"
        />
        <FilterShortcutItem
          jobIds={[2]}
          maxExperience={3}
          minExperience={0}
          name="주니어 백엔드 개발자"
        />
      </Box>
    </ScrollArea>
  );
};
