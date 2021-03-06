/* eslint-disable no-console */
import React from 'react'
import { mount } from 'enzyme'
import ReactJkMusicPlayer from '../../src'
import { FaHeadphonesIcon } from '../../src/components/Icon'

const getTitle = (wrapper, className, at) => {
  if (at) {
    return wrapper.find(className).at(at).getDOMNode().getAttribute('title')
  }
  return wrapper.find(className).getDOMNode().getAttribute('title')
}
describe('Locale test', () => {
  it('should render default locale with en_US', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer className="text-class-name" showLyric showDestroy />,
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should render locale with zh_CN', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        className="text-class-name"
        showLyric
        showDestroy
        locale="zh_CN"
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should override locale with en_US', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        className="text-class-name"
        showLyric
        showDestroy
        locale={{
          audioTitle: 'audioTitle',
        }}
        audioLists={[
          {
            musicSrc: 'xx',
            name: 'audioName',
          },
        ]}
      />,
    )
    wrapper.setState({ audioLyricVisible: true })
    expect(wrapper.find('.music-player-controller-setting').text()).toContain(
      'Open',
    )
    expect(wrapper.find(FaHeadphonesIcon)).toHaveLength(1)

    wrapper.setProps({ mode: 'full' })
    expect(getTitle(wrapper, '.prev-audio')).toEqual('Previous track')
    expect(getTitle(wrapper, '.play-btn')).toEqual('Click to play')
    expect(getTitle(wrapper, '.next-audio')).toEqual('Next track')
    expect(getTitle(wrapper, '.reload-btn')).toEqual('Reload')
    expect(getTitle(wrapper, '.audio-download')).toEqual('Download')
    expect(getTitle(wrapper, 'audio')).toEqual('audioTitle')
    expect(getTitle(wrapper, '.theme-switch button')).toEqual('Dark/Light mode')
    expect(getTitle(wrapper, '.play-sounds')).toEqual('Volume')
    expect(getTitle(wrapper, '.loop-btn')).toEqual('Play in order')
    expect(getTitle(wrapper, '.lyric-btn')).toEqual('Toggle lyric')
    expect(getTitle(wrapper, '.audio-lists-btn')).toEqual('Playlists')
    expect(getTitle(wrapper, '.hide-panel')).toEqual('Minimize')
    expect(getTitle(wrapper, '.destroy-btn')).toEqual('Destroy')
    expect(wrapper.find('.music-player-lyric').text()).toContain('No lyric')
    expect(wrapper.find('.rc-switch-inner').text()).toContain('D')
    wrapper.find('.rc-switch').simulate('click')
    expect(wrapper.find('.rc-switch-inner').text()).toContain('L')

    // ??????????????????
    wrapper.find('.audio-lists-btn').simulate('click')
    expect(wrapper.find('.audio-lists-panel-header-title').text()).toContain(
      'Playlists',
    )
    expect(getTitle(wrapper, '.audio-lists-panel-header-delete-btn')).toEqual(
      'Delete audio lists',
    )
    expect(getTitle(wrapper, '.audio-lists-panel-header-close-btn')).toEqual(
      'Close',
    )
    expect(getTitle(wrapper, '.audio-lists-panel .audio-item', 0)).toEqual(
      'Click to play',
    )
    expect(getTitle(wrapper, '.audio-lists-panel .player-delete', 0)).toEqual(
      'Click to delete audioName',
    )
  })

  it('should render locale with zh_CN detail', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        showLyric
        showDestroy
        locale="zh_CN"
        audioLists={[
          {
            musicSrc: 'xx',
            name: 'audioName',
            singer: 'singerName',
          },
        ]}
      />,
    )
    wrapper.setState({ audioLyricVisible: true })
    expect(wrapper.find('.music-player-controller-setting').text()).toContain(
      '??????',
    )
    expect(wrapper.find(FaHeadphonesIcon)).toHaveLength(1)

    wrapper.setProps({ mode: 'full' })
    expect(getTitle(wrapper, '.prev-audio')).toEqual('?????????')
    expect(getTitle(wrapper, '.play-btn')).toEqual('????????????')
    expect(getTitle(wrapper, '.next-audio')).toEqual('?????????')
    expect(getTitle(wrapper, '.reload-btn')).toEqual('????????????')
    expect(getTitle(wrapper, '.audio-download')).toEqual('??????')
    expect(getTitle(wrapper, 'audio')).toEqual('audioName - singerName')
    expect(getTitle(wrapper, '.theme-switch button')).toEqual('??????/?????? ??????')
    expect(getTitle(wrapper, '.play-sounds')).toEqual('??????')
    expect(getTitle(wrapper, '.loop-btn')).toEqual('????????????')
    expect(getTitle(wrapper, '.lyric-btn')).toEqual('??????/?????? ??????')
    expect(getTitle(wrapper, '.audio-lists-btn')).toEqual('????????????')
    expect(getTitle(wrapper, '.hide-panel')).toEqual('?????????????????????')
    expect(getTitle(wrapper, '.destroy-btn')).toEqual('???????????????')
    expect(wrapper.find('.music-player-lyric').text()).toContain('????????????')
    expect(wrapper.find('.rc-switch-inner').text()).toContain('???')
    wrapper.find('.rc-switch').simulate('click')
    expect(wrapper.find('.rc-switch-inner').text()).toContain('???')

    // ??????????????????
    wrapper.find('.audio-lists-btn').simulate('click')
    expect(
      wrapper.find('.audio-lists-panel .audio-lists-panel-header-title').text(),
    ).toContain('???????????? / 1')
    expect(getTitle(wrapper, '.audio-lists-panel-header-delete-btn')).toEqual(
      '??????????????????',
    )
    expect(getTitle(wrapper, '.audio-lists-panel-header-close-btn')).toEqual(
      '??????',
    )
    expect(getTitle(wrapper, '.audio-lists-panel .audio-item', 0)).toEqual(
      '????????????',
    )
    expect(getTitle(wrapper, '.audio-lists-panel .player-delete', 0)).toEqual(
      '???????????? audioName',
    )
  })

  it('should override locale', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        locale={{
          openText: 'test',
        }}
      />,
    )
    expect(wrapper.find('.music-player-controller-setting').text()).toContain(
      'test',
    )
  })

  // https://github.com/lijinke666/react-music-player/issues/83
  it('should render locale with functional audioTitle', () => {
    const wrapper = mount(
      <ReactJkMusicPlayer
        className="text-class-name"
        showMiniProcessBar
        showLyric
        showDestroy
        locale={{
          audioTitle: ({ name }) => `test-${name}`,
        }}
        audioLists={[
          {
            musicSrc: 'xx',
            name: 'audioName',
          },
        ]}
      />,
    )
    expect(getTitle(wrapper, 'audio')).toEqual('test-audioName')
  })
})
