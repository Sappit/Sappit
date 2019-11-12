import { Kind } from '~/lib/enum';

export default function isVotableKind (kind) {
  if (kind === Kind.Comment) return true;
  if (kind === Kind.Post) return true;
  return false;
}
