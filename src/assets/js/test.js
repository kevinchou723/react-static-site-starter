$('.component-test__title').on('click', (e) => {
  const $title = $(e.target)
  if($title.hasClass('component-test__title--green')){
    $title.removeClass('component-test__title--green')
  }else {
    $title.addClass('component-test__title--green')
  }
})