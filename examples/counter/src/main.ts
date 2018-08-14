import 'papercss/dist/paper.css'

import { createElement } from 'react'
import { render } from 'react-dom'

import { App } from './app/app'

bootstrap()

function bootstrap() {
  const mountTo = document.getElementById('app')
  render(createElement(App), mountTo)
}
