import React, { FunctionComponent } from 'react';
import { cookies, headers, } from 'next/headers'
// import { useSearchParams } from 'next/navigation';
import { sleep } from '@/utils';
import { doer } from '@/utils/maxwell';
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
  const activityInfo = await doer('/v1/user/demo_trading/get_enrolled_info', { activity_id: 'demo_trading_2023_07_25' });
  console.log('getData', referer, data)
  await sleep(1);
  return {
    token,
    referer,
    // data: data.json()
    data,
    // activityInfo: { payload: { end_ts: 123456789 } }
    activityInfo
  }
}



const Demo: FunctionComponent<DemoProps> = async () => {
  const { token, referer, data, activityInfo = { payload: { end_ts: 9999 } } } = await getData();


  return (
    <div>
      <h1>{`Demo-${referer}-${token}`}</h1>
      <h2>{token}</h2>
      <h1>{referer}</h1>
      <div>{data.body}</div>
      <Index referer={referer ?? ''} data={[]} activityInfo={activityInfo.payload} />
    </div>
  );
}

export default Demo;
