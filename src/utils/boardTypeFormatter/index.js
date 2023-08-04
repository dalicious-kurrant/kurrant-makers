export function boardTypeFormatted(data) {
  switch (data) {
    case 0:
      return '전체 공지';
    case 4:
      return '메이커스 공지';
    case 6:
      return '정보 변경 승인';
    case 7:
      return '가격 변경 승인';
    case 8:
      return '정산 완료';
    default:
      return '전체 공지';
  }
}
