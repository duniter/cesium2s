import {isNotNil} from "../../../shared/functions";
import {EsRegexp} from "../es.constants";
import {EsAttachment, EsHit, EsImageAttachment} from "./es.model";

export function parseTagsFromText(value: string, prefix?: string): string[] {
  prefix = prefix || '#';
  const regExp = prefix === '@' ? EsRegexp.USER_TAG : EsRegexp.HASH_TAG;
  let matches = value && regExp.exec(value);
  const tags = matches && [] || undefined;
  while(matches) {
    const tag = matches[1];
    if (tags.findIndex(t => t == tag) === -1) {
      tags.push(tag);
    }
    value = value.substr(matches.index + matches[1].length + 1);
    matches = value.length > 0 && regExp.exec(value);
  }
  return tags;
}

export function parseUrlsFromText(value) {
  let matches = value && EsRegexp.URL.exec(value);
  const urls = matches && [] || undefined;
  while(matches) {
    const url = matches[0];
    if (urls.findIndex(u => u === url) === -1) {
      urls.push(url);
    }
    value = value.substr(matches.index + matches[0].length + 1);
    matches = value && EsRegexp.URL.exec(value);
  }
  return urls;
}

export function escape(text) {
  if (!text) return text;
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function parseAsHtml(text, options) {

  let content = text ? escape(text.trim()) : undefined;
  if (content) {
    options = options || {};
    options.tagState = options.tagState || '/wot/search?q=';
    options.uidState = options.uidState || '/wot/identity/';
    if (options.newLine || isNotNil(options.newLine)) {
      content = content.replace(/\n/g, '<br>\n');
    }

    // Replace URL in description
    const urls = parseUrlsFromText(content);
    urls.forEach(url => {
      // Make sure protocol is defined
      const href = (url.startsWith('http://') || url.startsWith('https://')) ? url : ('http://' + url);
      // Redirect URL to the function 'openLink', to open a new window if need (e.g. desktop app)
      const link = `<a (tap)="openLink($event, '${href}')" href="${href}" target="_blank">${truncUrl(url)}</a>`;
      content = content.replace(url, link);
    });

    // Replace hashtags
    if (options.tagState) {
      const hashTags = parseTagsFromText(content);
      hashTags.forEach(tag => {
        const link = `<a [routerLink]="${options.tagState}?hash=${tag}">@${tag}</a>`;
        content = content.replace('#' + tag, link);
      });
    }

    // Replace uid tags
    if (options.uidState) {
      const userTags = parseTagsFromText(content, '@');
      userTags.forEach(tag => {
          const link = `<a [routerLink]="${options.uidState}/${tag}">@${tag}</a>`;
          content = content.replace('@' + tag, link);
      });
    }
  }
  return content;
}

export function parseImageFromHit<T>(
    hit: EsHit,
    peerUrl: string,
    imageFieldName: string): EsImageAttachment {
  if (!hit || !hit._source) return;
  const attachment =  hit._source[imageFieldName] as EsAttachment;
  if (!attachment || !attachment._content_type || !attachment._content_type.startsWith("image/")) return;
  let src: string;
  // If full content: then use it directly
  if (attachment._content) {
    src = "data:" + attachment._content_type + ";base64," + attachment._content;
  }
  // Compute an url
  else {
    const extension = attachment._content_type.substr(6);
    src = [peerUrl, hit._index, hit._type, hit._id, '_image', imageFieldName].join('/') + '.' + extension;
  }
  return {
    _content_type: attachment._content_type,
    src,
    title: attachment._title,
    name:  attachment._name
  };
}

export function truncUrl(input: string, size?: number): string {
  size = size || 25;
  let startIndex = input.startsWith('http://') ? 7 : (input.startsWith('https://') ? 8 : 0);
  startIndex = input.startsWith('www.', startIndex) ? startIndex + 4 : startIndex; // Remove sequence 'www.'
  return !input || (input.length - startIndex) <= size ? input.substr(startIndex) : (input.substr(startIndex, size) + '...');
}
