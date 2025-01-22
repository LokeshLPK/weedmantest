
import Sections from '@/components/Sections';

type PageContentProps={
  sections : Array<Section>,
  _type: string
}

export default function PageContent(props: PageContentProps) {
  const { sections } = props;
  return (
    <Sections sections={sections}  />
  )
}

