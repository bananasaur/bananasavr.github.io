// Assumes lodash and jquery are loaded
class Resume {
  constructor(options, resume) {
    this._options = {
      'inputSelector': _.get(options, 'inputSelector'),
      'outputSelector': _.get(options, 'outputSelector')
    }
    this._state = {
      'viewAll': false
    }
    this._resume = resume
    this.bind()
  }

  get state() {
    return this._state
  }

  set state(val) {
    this._state = _.assign(this._state, val)
  }

  bind() {
    let $inputSelector = $(this._options.inputSelector)
    let $outputSelector = $(this._options.outputSelector)

    $inputSelector.on('keyup', () => {
      this.state = { viewAll: false }
      if ($inputSelector.val() == '') {
        $outputSelector.html('')
        return
      }
      let query = $inputSelector.val()
      let html = this.getTemplate(this.search(query))
      $outputSelector.html(html)
    })
  }

  search(query) {
    const searchable = this._resume

    let result = _.filter(searchable, (o) => {
      let q = _.toLower(query)
      let t = _.toLower(o.name)
      return (new RegExp(q)).test(t)
    })

    return result
  }

  getTemplate(arr) {
    let html = ''
    _.forEach(arr, (obj) => {
      let start =  '<div class="resume-item"><p>' + obj.name + '</p><p class="rating-container">'
      let end = '</p></div>'
      let stars = ''
      for (let i = 1; i <= 5; i++) {
        if (i <= obj.rating) {
          stars += '<i class="rating material-icons">star</i>'
        } else {
          stars += '<i class="rating material-icons">star_border</i>'
        }
      }
      html += start + stars + end
    })
    return html
  }

  viewAllClicked() {
    let $inputSelector = $(this._options.inputSelector)
    let $outputSelector = $(this._options.outputSelector)
    $inputSelector.val('')
    this.state = { 'viewAll': !this.state['viewAll'] }

    if (this.state['viewAll']) {
      $outputSelector.html(this.getTemplate(this._resume))
    } else {
      $outputSelector.html('')
    }
  }
}

export default Resume
