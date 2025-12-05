'use server';
import { cookies } from "next/headers";
export async function  getServerLocaleOptions() {
 const _cookies = await cookies(); 
 const  locale = _cookies.get(process.env.LOCALE!)?.value || "ar";
 const isRtl = locale?.toLowerCase() == "ar";
 const dir = isRtl ? "rtl" : "ltr";
 const lang = isRtl ? "ar-SA" : "en-US";
 return {locale,isRtl,dir,lang};
}
