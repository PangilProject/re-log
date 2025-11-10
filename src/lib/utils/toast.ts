import toast from 'svelte-5-french-toast';

export function deleteToast() {
	toast.success('회고가 삭제되었습니다.');
}

export function errorChoiceToast() {
	toast.error('삭제할 회고를 선택해주세요.');
}
