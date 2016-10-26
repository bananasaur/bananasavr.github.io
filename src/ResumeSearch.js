import resume from './resume.js'
import _ from 'lodash'

function Resume(opt) {
  const options = {
    'inputSelector': _.get(opt, 'inputSelector'),
    'outputSelector': _.get(opt, 'outputSelector')
  }

  function bind(inputSelector) {
    let $inputSelector = $(inputSelector)

    $inputSelector.on('keyup', function() {
      if ($(this).val() == '') {
        $(options.outputSelector).html('')
        return
      }
      let query = $(this).val()
      $(options.outputSelector).html(getTemplate(search(query)))
    })
  }

  function search(query) {
    const searchable = resume

    let result = _.filter(searchable, (o) => {
      // return _.startsWith(_.toLower(o.name), _.toLower(query))
      let q = _.toLower(query)
      let t = _.toLower(o.name)
      return (new RegExp(q)).test(t)
    })

    return result
  }

  function getTemplate(arr) {
    let html = ''
    _.forEach(arr, (obj) => {
      let start =  _.template('<div class="resume-item"><p><%= name %></p><p class="rating-container">')
      let end = '</p></div>'
      let stars = ''
      for (let i = 1; i <= 5; i++) {
        if (i <= obj.rating) {
          stars += '<i class="rating material-icons">star</i>'
        } else {
          stars += '<i class="rating material-icons">star_border</i>'
        }
      }
      html += start(obj) + stars + end
    })
    return html
  }

  bind(options.inputSelector)
}

export default Resume
