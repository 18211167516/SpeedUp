<!-- eslint-disable vue/no-v-html -->
<template>
    <div class="v-text">
        <div
            ref="text"
            :contenteditable="canEdit"
            :class="{ canEdit }"
            :tabindex="element.id"
            :style="{ verticalAlign: element.style.verticalAlign }"
            v-html="element.propValue"
        ></div>
    </div>
</template>

<script>

export default {
    name:"VText",
    props: {
        propValue: {
            type: String,
            require: true,
            default: '',
        },
        element: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            canEdit: false,
        }
    },
    computed: {
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
.v-text {
    width: 100%;
    height: 100%;
    display: table;

    div {
        display: table-cell;
        width: 100%;
        height: 100%;
        outline: none;
    }

    .canEdit {
        cursor: text;
        height: 100%;
    }
}

.preview {
    user-select: none;
}
</style>
