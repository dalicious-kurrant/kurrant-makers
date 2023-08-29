import {useQuery} from 'react-query';
import {noticeApis} from '../api/notice';

export function useNoticeLoad(page, selectType) {
  return useQuery('noticeList', () => {
    return noticeApis.getNoticeList(page, selectType);
  });
}
