"use client"
import { FunctionComponent, useState, useEffect } from "react";

interface IndexProps {
  referer: string;
  data: any;
  activityInfo: any;
}

const Index: FunctionComponent<IndexProps> = ({ referer, data, activityInfo }) => {

  const [count, setCount] = useState<number>(0);
  console.log('index', referer, data, activityInfo);
  return (
    <div>
      这是组件
      <h1>{referer}</h1>
      <h1>{count}</h1>
      <div onClick={() => setCount(c => c + 1)}>count++</div>
      <p>{activityInfo.end_ts}</p>
    </div>
  );
}

export default Index;
