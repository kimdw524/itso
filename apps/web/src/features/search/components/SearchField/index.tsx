'use client';

import { useRef, useState } from 'react';

import { Typography } from '@kimdw-rtk/ui';
import { theme } from '@kimdw-rtk/ui/theme';
import { SearchIcon } from 'lucide-react';

import { RollingText } from '@/shared/components/RollingText';

import { SearchResult } from '../SearchResult';
import * as s from './style.css';

export const SearchField = () => {
  const [value, setValue] = useState<string>('');
  const textRef = useRef<HTMLInputElement>(null);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {/* 검색어 텍스트필드 */}
        <div className={s.inner} onClick={() => textRef.current?.focus()}>
          <SearchIcon stroke={`rgb(${theme.color.primary})`} />
          <div className={s.textContainer}>
            <input
              ref={textRef}
              className={s.textField}
              placeholder=""
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <RollingText className={s.placeholder} duration={500}>
              <Typography color="muted-foreground">
                신입 Frontend 개발자
              </Typography>
              <Typography color="muted-foreground">카카오페이</Typography>
              <Typography color="muted-foreground">111퍼센트</Typography>
            </RollingText>
          </div>
        </div>

        {/* 검색 결과 */}
        <SearchResult query={value} />
      </div>
    </div>
  );
};
