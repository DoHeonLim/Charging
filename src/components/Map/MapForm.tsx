'use client';

/**
  form 관련
*/
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/**
  shadcn/ui 관련
*/
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
  커스텀 컴포넌트 관련
*/

import { useSetAtom } from 'jotai';
import { chargersAtom } from '@/atoms/chargerData';
import { chargers } from '@/data/chargers';
import SearchCharger from './SearchCharger';

/**
  @zcode 시도 코드
  @city 도시 명
*/
const zcodeList = [
  { zcode: '11', city: '서울' },
  { zcode: '26', city: '부산' },
  { zcode: '27', city: '대구' },
  { zcode: '28', city: '인천' },
  { zcode: '29', city: '광주' },
  { zcode: '30', city: '대전' },
  { zcode: '31', city: '울산' },
  { zcode: '36', city: '세종' },
  { zcode: '41', city: '경기' },
  { zcode: '51', city: '강원' },
  { zcode: '43', city: '충북' },
  { zcode: '44', city: '충남' },
  { zcode: '52', city: '전북' },
  { zcode: '46', city: '전남' },
  { zcode: '47', city: '경북' },
  { zcode: '48', city: '경남' },
  { zcode: '50', city: '제주' },
];

/**
  type : 타입 코드
  charger : 충전기 타입
*/
const chargerTypeList = [
  { type: '01', charger: 'DC차데모' },
  { type: '02', charger: '완속' },
  { type: '03', charger: 'DC차데모 + AC3상' },
  { type: '04', charger: 'DC콤보' },
  { type: '05', charger: 'DC차데모 + DC콤보' },
  { type: '06', charger: 'DC차데모 + AC3상 + DC콤보' },
  { type: '07', charger: 'AC3상' },
];

const FormSchema = z.object({
  addr: z.string().min(2, {
    message: '주소는 2글자 이상이여야 합니다.',
  }),
  zcode: z.string(),
  chgerType: z.string(),
});

export function MapForm() {
  const setChargers = useSetAtom(chargersAtom);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      addr: '',
      zcode: '',
      chgerType: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    /* eslint-disable no-console */
    setChargers(chargers);
    console.log(values);
  }

  return (
    <div>
      <Card className='w-[450px] h-40'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-column w-2/3 space-y-6 self-auto ml-4'
          >
            <div className='flex ml-4 mt-6 gap-4'>
              <FormField
                control={form.control}
                name='zcode'
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-[150px]'>
                          <SelectValue placeholder='지역' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>지역</SelectLabel>
                          {zcodeList.map((item, idx) => (
                            <SelectItem key={idx} value={item.zcode}>
                              {item.city}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='chgerType'
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-[150px]'>
                          <SelectValue placeholder='타입' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>타입</SelectLabel>
                          {chargerTypeList.map((item, idx) => (
                            <SelectItem key={idx} value={item.type}>
                              {item.charger}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex'>
              <FormField
                control={form.control}
                name='addr'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='충전소 또는 지역 검색' {...field} className='w-80 ml-4' />
                    </FormControl>
                    <FormMessage className='ml-4' />
                  </FormItem>
                )}
              />
              <Button type='submit' className='ml-4'>
                검색
              </Button>
            </div>
          </form>
        </Form>
      </Card>
      <div className='h-[850px] rounded-md border max-h-full overflow-auto relative'>
        <SearchCharger />
      </div>
    </div>
  );
}
