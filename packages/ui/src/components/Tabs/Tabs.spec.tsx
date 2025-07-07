import { render, screen, fireEvent } from '@testing-library/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '.';
import { uiTest } from '../../tests/uiTest';

describe('Tabs 컴포넌트', () => {
  uiTest(Tabs, 'Tabs');
  uiTest(TabsList, 'TabsList');

  it('TabsTrigger를 클릭하면 해당하는 value의 Content를 보여준다.', () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger value={1}>Trigger1</TabsTrigger>
          <TabsTrigger value={2}>Trigger2</TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
      </Tabs>,
    );

    fireEvent.click(screen.getByText('Trigger1'));
    expect(screen.queryByText('Content1')).toBeInTheDocument();
    expect(screen.queryByText('Content2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Trigger2'));
    expect(screen.queryByText('Content1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content2')).toBeInTheDocument();
  });

  it('defaultValue에 해당하는 Content를 기본적으로 보여준다.', () => {
    render(
      <Tabs defaultValue={2}>
        <TabsList>
          <TabsTrigger value={1}>Trigger1</TabsTrigger>
          <TabsTrigger value={2}>Trigger2</TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
      </Tabs>,
    );

    expect(screen.queryByText('Content1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content2')).toBeInTheDocument();
  });
});
