import React from "react";

const InfoModal = ({ onClick }) => {

  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-x-8 inset-y-16 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="nm-inset-gray-100 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <span className="text-xl font-semibold">
              Garoo
            </span>
          </div>
          {/*body*/}
          <div className="relative px-6 py-1 flex-auto">
            <p className="my-1 text-xs leading-relaxed">
              Twitterアカウント名を入れると<br />
              お気に入りしたツイート画像を<br />
              一覧で閲覧できるサービスです。<br />
              <br />
              非公開アカウントは閲覧できません<br />
              <br />
              本サービスは<br />
              Twitter APIを利用しています。<br />
              <br />
              お問い合わせは<br />
              DMにてお願い致します<br />
              </p>
            <a href="https://twitter.com/marusho_summers" className="my-1 text-xs leading-relaxed">
              @marusho_summers
            </a>
        </div>
          {/*footer*/}
          <div className="flex items-center justify-center px-6 py-5">
            <button
              className="nm-flat-gray-100 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none  rounded-full hover:bg-gray-200 "
              type="button"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal;
