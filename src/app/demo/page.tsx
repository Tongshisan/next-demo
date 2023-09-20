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
  const res = await fetch('http://jsonplaceholder.typicode.com/posts/2');
  const data = await res.json();
  console.log('getData', referer, data)
  await sleep(1);
  return {
    token,
    referer,
    // data: data.json()
    data
  }
}



const Demo: FunctionComponent<DemoProps> = async () => {
  const { token, referer, data } = await getData();


  return (
    <div>
      <h1>{`Demo-${referer}-${token}`}</h1>
      <h2>{token}</h2>
      <h1>{referer}</h1>
      <div>{data.body}</div>
      <Index referer={referer ?? ''} data={[]} />
    </div>
  );
}

export default Demo;
