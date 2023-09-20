import React, { FunctionComponent } from 'react';
import { cookies, headers, } from 'next/headers'
// import { useSearchParams } from 'next/navigation';
import { sleep } from '@/utils';
import Index from './index-page/index';


interface DemoProps {

}

const getData = async () => {
  // const token = useSearchParams().get('token');
  // console.log('header', headers, headers())
  const token = '-';
  const referer = headers().get('referer')
  await sleep(1);
  return {
    token,
    referer
  }
}



const Demo: FunctionComponent<DemoProps> = async () => {
  const { token, referer } = await getData();


  return (
    <div>
      <h1>Demo</h1>
      <h2>{token}</h2>
      <h1>{referer}</h1>
      <Index referer={referer ?? ''} data={[]} />
    </div>
  );
}

export default Demo;
