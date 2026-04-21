import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { PageMetadata } from '@shared/models/pagemetadata.model';

@Injectable({
  providedIn: 'root',
})
export class MetaTags {
  titleService = inject(Title);
  metaService = inject(Meta);
  defaultMetadata: PageMetadata = {
    title: 'ng store',
    description: 'Angular store application',
    image: '',
  };

  private generateMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    return [
      { name: 'title', content: metadata.title },
      { name: 'description', content: metadata.description },
      { property: 'og:title', content: metadata.title },
      { property: 'og:description', content: metadata.description },
      { property: 'og:image', content: metadata.image },
    ];
  }

  updateMetaTags(metadata: Partial<PageMetadata>): void {
    // Combinar metadatos proporcionados con valores predeterminados
    const metaInfo = { ...this.defaultMetadata, ...metadata };

    // Generar definiciones de metadatos
    const tags = this.generateMetaDefinitions(metaInfo);

    // Actualizar etiquetas meta
    tags.forEach((tag) => this.metaService.updateTag(tag));

    // Actualizar el título del documento
    this.titleService.setTitle(metaInfo.title);
  }
}
