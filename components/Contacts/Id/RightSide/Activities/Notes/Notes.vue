<!--<script lang="ts" setup>-->
<!--import useTasks, { useTasksComponents } from "@/composables/useTasks";-->
<!--import useContacts from "@/composables/useContacts";-->

<!--// const { notes, pinnedNotes, addTask } = useTasks();-->

<!--const { Note } = useTasksComponents();-->

<!--const { contact } = useContacts();-->


<!--</script>-->

<!--<template>-->
<!--  <div class="p-2 text-slate-500">-->
<!--    <div class="flex justify-center py-4">-->
<!--      <UIButton :active="true" type="submit" @click="addTask('note', contact)">-->
<!--        Crear Nota-->
<!--      </UIButton>-->
<!--    </div>-->

<!--    <div v-auto-animate>-->

<!--      <div v-if="pinnedNotes?.length > 0" v-auto-animate class="activities">-->
<!--        <p class="text-slate-500 font-normal py-4">Ancladas</p>-->
<!--        <hr>-->
<!--        <Note v-for="task in pinnedNotes"-->
<!--              :key="task.id"-->
<!--              :note="task" />-->
<!--      </div>-->

<!--      <div v-if="notes?.length > 0" v-auto-animate class="activities">-->
<!--        <p class="text-slate-500 font-normal py-4">Pasadas</p>-->
<!--        <hr>-->
<!--        <Note v-for="task in notes"-->
<!--              :key="task.id"-->
<!--              :note="task" />-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->