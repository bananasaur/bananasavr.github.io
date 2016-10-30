function Resume(options, resume) {
  // Declarations
  let self = this
  const _options = {
    'inputSelector': _.get(options, 'inputSelector'),
    'outputSelector': _.get(options, 'outputSelector')
  }

  // State Management
  let _state = {
    'viewAll': false
  }

  self.setState = function(object) {
    _state = _.assign(_state, object)
  }

  self.getState = function(string) {
    return _state[string]
  }

  // Class Functions
  function bind(inputSelector) {
    let $inputSelector = $(inputSelector)

    $inputSelector.on('keyup', function() {
      self.setState({ 'viewAll': false })
      if ($(this).val() == '') {
        $(_options.outputSelector).html('')
        return
      }
      let query = $(this).val()
      $(_options.outputSelector).html(getTemplate(search(query)))
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

  self.viewAllClicked = function() {
    $(_options.inputSelector).val('')
    self.setState({ 'viewAll': !self.getState('viewAll') })

    if (self.getState('viewAll')) {
      $(_options.outputSelector).html(getTemplate(resume))
    } else {
      $(_options.outputSelector).html('')
    }
  }

  bind(_options.inputSelector)
}

export default Resume
