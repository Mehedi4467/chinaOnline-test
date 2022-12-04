import React from 'react';
import { LocationIcon, PhoneIcon } from '../components/icons';
import { Layout } from '../layout';

const returns = () => {
  return (
    <Layout title="Returns and Refunds" description="Returns and Refunds page">
      <section className="policy">
        <div className="policy__top">
          <h1 className="policy__heading">Return & Refund Policy</h1>
          <p className="policy__text">Updated on 17 October, 2022</p>
        </div>
        <div className="policy__main">
          <p className="policy__subheading">
            আপনাদের অর্ডারকৃত পণ্যগুলোর রেডিস্টক আমাদের কাছে থাকে না। আপনারা
            অর্ডার করার পর সরাসরি সেলার থেকে আপনাদের দরজায় আমরা পণ্যগুলো পৌঁছে
            দেই আর তাই খুব সীমিত কিছু পরিস্থিতি ছাড়া আমাদের পক্ষে রিফান্ড অথবা
            রিটার্ন দেয়া সম্ভব হয় না।
          </p>
          <article className="policy__content">
            <h2 className="policy__content-heading">রিটার্ন পলিসিঃ</h2>
            <p className="policy__content-text">
              কোন কোন ক্ষেত্রে রিফান্ড প্রযোজ্য হবেঃ
            </p>
            <p className="policy__content-text">
              ০১। অর্ডার করা পণ্য আমাদের কাছ থেকে ডেলিভারি পাওয়ার পর পণ্যে যদি
              কোনো ত্রুটি থাকে, ড্যামেজ থাকে অথবা আপনাকে যদি ভুল পণ্য কিংবা
              অসম্পূর্ণ পণ্য পাঠানো হয় শুধুমাত্র সেই ক্ষেত্রে আমাদের ওয়েবসাইটের
              রিফান্ড অপশনে যেয়ে ২৪ ঘণ্টার মধ্যে উপযুক্ত প্রমান সহ রিফান্ডের
              জন্য আবেদন করতে হবে। এর পরে রিফান্ডের জন্য আবেদন করলে তা গ্রহণ করা
              হবে না।
            </p>
            <p className="policy__content-text">
              ০২। সেলারের কাছে আপনার অর্ডার করা পণ্য না থাকলে আপনি রিফান্ডের
              জন্য আবেদন করতে পারবেন।
            </p>
            <p className="policy__content-text">
              ০৩। অনেকগুলো পণ্য একসাথে অর্ডার করার ফলে কোনো কোনো সময় সেলার কিছু
              পণ্য পাঠাতে দেরি করে। এই ক্ষেত্রে যে পণ্যগুলো আমাদের অফিসে চলে আসে
              আমরা সেগুলো আপনাদের ঠিকানায় পাঠিয়ে দেই। বাকি পণ্যগুলো পেতে কিছুদিন
              অপেক্ষা করুন। আপনি চাইলে Chinaonlinebd.com/tracking থেকে আপনার
              অর্ডারটি ট্র্যাক করতে পারেন।
            </p>
            <p className="policy__content-text">
              ০৪। ৪৫ কার্যদিবস(সকল প্রকার ছুটি ব্যতীত) মধ্যে আপনার অর্ডার করা
              পণ্য কোনো কারণে না আসলে রিফান্ডের জন্য আবেদন করা যাবে।
            </p>
            <p className="policy__content-text">
              ০৫। আমাদের এখানে পণ্য এক্সচেঞ্জ করার সিস্টেম নেই।
            </p>
          </article>
          <article className="policy__content">
            <h2 className="policy__content-heading">
              মিসিং বা হারিয়ে যাওয়া প্রোডাক্ট এর রিফান্ড এর ক্ষেত্রে
              Chinaonlinebd এর নতুন কিছু নির্দেশনাঃ
            </h2>
            <p className="policy__content-text">
              ১। গ্রাহক যখন তার ডেলিভারিকৃত প্রোডাক্ট গুলো আনবক্সিং করবে ,তখন
              তার একটি ভিডিও ফুটেজ সংরক্ষণ করতে হবে।
            </p>
            <p className="policy__content-text">
              ২। ডেলিভারিকৃত প্রত্যেকটি প্রোডাক্টের বক্স এর উপরে একটি চাইনিজ
              ইনভয়েস/ স্টিকার থাকে সেটির একটি ছবি এবং প্রোডাক্টের বক্সের ভেতরে
              একটি চাইনিজ ইনভয়েস থাকে উভয়ের ছবি তুলে সংরক্ষণ করতে হবে।
            </p>
            <p className="policy__content-text">
              ৩। কাস্টমার যে ওয়েট ম্যাশিন /পরিমাপকের মাধ্যমে ওজন করবেন, সেই
              পরিমাপকের উপরে সবগুলো প্রোডাক্ট রেখে ওজনকৃত অবস্থায় ছবি তুলে রাখতে
              হবে।
            </p>
            <p className="policy__content-text">
              ৪ । মিসিং প্রোডাক্টের ক্ষেত্রে ডেলিভারিকৃত প্রোডাক্টের যথাযথ সাইজ
              /কালার উল্লেখ করে তার মধ্যে থেকে মিসিং প্রোডাক্টের সংখ্যাসহ
              বিস্তারিত লিখিত এবং ছবিসহ আমাদের জানাতে হবে।
            </p>
            <p className="policy__content-text">
              ৫। কোন কারনে যদি উপরে উল্লেখিত পদ্ধতিতে মিসিং বা হারিয়ে যাওয়া
              প্রোডাক্টের সনাক্তকরণ সম্ভব না হয় সেক্ষেত্রে অবশ্যই গ্রাহককে সকল
              প্রোডাক্ট ওয়্যারহাউজে ফেরত পাঠাতে হবে।
            </p>
            <p className="policy__content-text">
              ৬। উপরোক্ত কাজগুলো গ্রাহককে অবশ্যই ডেলিভারি হওয়ার ২৪ ঘণ্টা সময়ের
              মধ্যে সম্পন্ন করে যথাযথ কাস্টমার সাপোর্টে অভিযোগ জানাতে হবে।
            </p>
          </article>
          <article className="policy__content">
            <h2 className="policy__content-heading">রিফান্ড করার সময়সীমাঃ</h2>
            <p className="policy__content-text">
              আপনি সবগুলো শর্ত মেনে রিফান্ডের জন্য আবেদন করার পর আমাদের টিম
              আপনার সাথে যোগাযোগ করবে। আপনার আবেদনটি যদি আমাদের রিফান্ড পলিসির
              মধ্যে পরে সেই ক্ষেত্রে আপনার অর্ডার করা পণ্যের মূল্য ১০-১৫ কর্ম
              দিবসের মধ্যে রিফান্ড করা হবে। ক্ষেত্র বিশেষে, আপনার পেমেন্ট মেথডের
              ওপর ভিত্তি করে রিফান্ড টাইম কম বা বেশি হতে পারে।
            </p>
          </article>
          <article className="policy__content">
            <h2 className="policy__content-heading">
              কোন কোন ক্ষেত্রে রিটার্ন প্রযোজ্য হবেঃ
            </h2>
            <p className="policy__content-text">
              অর্ডার করা পণ্যের সাথে ডেলিভারি করা পণ্যের কালার কিংবা সাইজের মিল
              না থাকলে সেই পণ্য রিটার্ন করার ক্ষেত্রে আমাদের ওয়েবসাইটের রিটার্ন
              অপশনে যেয়ে ২৪ ঘণ্টার মধ্যে উপযুক্ত প্রমান সহ রিফান্ডের জন্য আবেদন
              করতে হবে। এর পরে আবেদন করলে তা আর গ্রহণযোগ্য হবে না। আমাদের টিম
              আপনার আবেদনটি বিশ্লেষণ করে আপনার সাথে যোগাযোগ করবে।
            </p>
          </article>
          <article className="policy__content">
            <h2 className="policy__content-heading">
              গোপনীয়তা নীতিমালা পরিবর্তনঃ
            </h2>
            <p className="policy__content-text">
              এই গোপনীয়তা নীতিমালাটি Chinaonlinebd.com যেকোন সময়ে পরিবর্তন করার
              অধিকার রাখে। আমাদের গোপনীয়তা নীতিমালায় যদি কোন পরিবর্তন আনা হয়,
              সেই ক্ষেত্রে পরিবর্তিত গোপনীয়তা নীতিমালাটি আমরা এখানে রাখবো।
            </p>
          </article>
          <article className="policy__content">
            <h2 className="policy__content-heading">
              কোন কোন ক্ষেত্রে রিটার্ন প্রযোজ্য হবেনাঃ
            </h2>
            <p className="policy__content-text">
              ০১। পণ্য রিসিভ করার ২৪ ঘন্টার মধ্যে আমাদেরকে অবগত না করলে।
            </p>
            <p className="policy__content-text">
              ০২। কম্পিউটার অথবা ফোনের ডিসপ্লে কালারের কারণে ওয়েবসাইটে দেয়া
              পণ্যের ছবির সাথে আসল পণ্যের কালারের তারতম্য হলে।
            </p>
            <p className="policy__content-text">
              ০৩। সাইজের ক্ষেত্রে ১-৪ ইঞ্চি তারতম্য হলে।
            </p>
            <p className="policy__content-text">
              ০৪। পণ্যের কোয়ালিটি নিয়ে সন্তুষ্ট না হলে।
            </p>
            <p className="policy__content-text">০৫। পণ্যটি ব্যবহার করা হলে।</p>
          </article>
          <article className="policy__content">
            <h2 className="policy__content-heading">রিটার্ন করার শর্তসমূহঃ</h2>
            <p className="policy__content-text">
              ১। রিটার্ন করা পণ্যটি অবশ্যই অব্যবহৃত হতে হবে, কোনো ভাবেই পণ্যটি
              ধৌত করা যাবেনা। শুধুমাত্র ফ্যাশন প্রোডাক্টের ক্ষেত্রে তা পরে
              ট্রায়াল দেয়া যাবে তবে তা কোনো ভাবেই ভাজ ফেলা কিংবা ধোঁয়া যাবে না।
            </p>
            <p className="policy__content-text">
              ২। পণ্যটিতে অবশ্যই অরিজিনাল ট্যাগ, ইউজার ম্যানুয়াল, ওয়ারেন্টি
              কার্ড এবং সাথে দেয়া সকল এক্সেসরিজ থাকতে হবে।
            </p>
            <p className="policy__content-text">
              ৩। পণ্যটি অবশ্যই সাথে দেয়া সাপ্লায়ারের অরিজিনাল প্যাকেট বা বক্সে
              সতর্কতার সাথে ভরে রিটার্ন করতে হবে। আর পণ্যটি যদি Chinaonlinebd এর
              প্যাকেট কিংবা বক্সে ভরে ডেলিভারি দেয়া হয়ে থাকে সেই ক্ষেত্রে সেইম
              প্যাকেট বা বক্সে ভরে শিপিং লেভেল সহ পণ্যটি রিটার্ন করতে হবে। কোনো
              ভাবেই সাপ্লাইয়ারের দেয়া বক্সে টেইপ বা স্টিকার ব্যবহার করা যাবে না।
            </p>
          </article>
          <article className="policy__content">
            <h2 className="policy__content-heading">
              কিভাবে রিফান্ড/রিটার্নের জন্য আবেদন করবেন?
            </h2>
            <p className="policy__content-text">
              ১। প্রথমে আপনাকে আপনার একাউন্টে লগিন করুন। তারপর সেখান থেকে My
              Order অপশনটিতে ক্লিক করুন।
            </p>
            <p className="policy__content-text">
              ২। সেখান থেকে আপনি যেই অর্ডারটি রিফান্ড/রিটার্ন করতে চান সেটি
              সিলেক্ট করুন এবং Manage Order বাটনটিতে ক্লিক করুন।
            </p>
            <p className="policy__content-text">
              ৩। তারপর আপনি যে পণ্যটি রিফান্ড/রিটার্ন করতে চান সেটি সিলেক্ট করুন
              এবং নির্ভুল ভাবে রিফান্ড/রিটার্ন ফর্মটি পূরণ করুন।
            </p>
            <p className="policy__content-text">
              ৪। রিটার্নের ক্ষেত্রে আপনি যে পণ্যটি রিটার্ন করতে চাচ্ছেন সেই
              পণ্যটি সতর্কতার সাথে সাপ্লায়ারের দেয়া অরিজিনাল এবং ভালো প্যাকেটে
              ভরে প্যাকেট করুন।
            </p>
            <p className="policy__content-text">
              ৫। আপনার ঠিকানা যদি ঢাকার মধ্যে হয় সেই ক্ষেত্রে আপনি চাইলে নিজে
              এসে আমাদের অফিসে পণ্যটি রিটার্ন করে দিতে পারবেন অথবা আমাদের
              ঠিকানায় কুরিয়ার করে পাঠাতে পারবেন। অন্যদিকে, আপনার ঠিকানা যদি
              ঢাকার বাইরে হয় সেই ক্ষেত্রে পণ্যটি কুরিয়ার করে আমাদের ঠিকানায়
              পাঠাতে পারবেন।
            </p>
            <p className="policy__content-text">
              ৬। ঢাকা কিংবা ঢাকার বাইরে থেকে পণ্য পাঠানোর আগে অবশ্যই আমাদেরকে
              আগে ফোনে অথবা ইমেইল করে জানাতে হবে। উভয় ক্ষেত্রে আপনাকে নিজ খরচে ও
              নিজ দায়িত্বে পণ্যটি কুরিয়ার করতে হবে। কুরিয়ারে পণ্য হারালে বা নষ্ট
              হলে তা আমাদের দায়বদ্ধতার বাইরে।
            </p>
          </article>
          <article className="policy__content">
            <h2 className="policy__content-heading">
              যে কুরিয়ার সার্ভিসসমূহের মাধ্যমে পণ্য রিটার্ন করতে পারবেনঃ
            </h2>
            <p className="policy__content-text">
              সুন্দরবন কুরিয়ার সার্ভিস অথবা এসএ পরিবহন।
            </p>
          </article>
          <article className="policy__content">
            <h2 className="policy__content-heading">কুরিয়ার করার ঠিকানাঃ</h2>
            <h3 className="policy__content-secondery-heading">
              CHINA ONLINE BD
            </h3>
            <p className="policy__text">
              <LocationIcon className="policy__icon" />
              House - 29, Road - 11, Sector - 10, Uttara, Dhaka - 1230
            </p>
            <p className="policy__text">
              <PhoneIcon className="policy__icon" />
              +8801811677154
            </p>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default returns;
